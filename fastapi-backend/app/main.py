from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from telegram import Bot, InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, ContextTypes, CallbackQueryHandler
import asyncio
import uvicorn
import httpx

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FormData(BaseModel):
    transactionID: str
    productCount: int
    price: float
    fastDelivery: bool
    address: str
    town: str
    userID: str
    paymentID: str

async def send_message(message: str, transaction_id: str = None, user_id: str = None, payment_id: str = None):
    bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
    chat_id = os.getenv('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        raise HTTPException(status_code=500, detail="Telegram credentials not configured")
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    # Create inline keyboard buttons if transaction details are provided
    keyboard = None
    if transaction_id and user_id and payment_id:
        keyboard = InlineKeyboardMarkup([
            [
                InlineKeyboardButton(
                    "Confirmar",
                    callback_data=f"confirm_{transaction_id}_{user_id}_{payment_id}"
                ),
                InlineKeyboardButton(
                    "Denegar",
                    callback_data=f"deny_{transaction_id}_{user_id}_{payment_id}"
                )
            ]
        ])
    
    payload = {
        "chat_id": chat_id,
        "text": message,
        "reply_markup": keyboard.to_dict() if keyboard else None
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Error sending message to Telegram: {str(e)}")

@app.post("/send_message_bot")
async def submit_form(form_data: FormData):
    print(f"Received form data: {form_data}")
    try:
        message = f"""Se ha registrado una nueva transacción con los siguientes detalles:
    - ID de Transacción: {form_data.transactionID}
    - Cantidad de Productos: {form_data.productCount}
    - Precio Total: ${form_data.price:.2f}
    - Entrega Rápida: {'Si' if form_data.fastDelivery else 'No'}
    - Direccion: {form_data.address}
    - Poblado: {form_data.town}

    Por favor, confirma o deniega esta transacción."""
        
        await send_message(message, form_data.transactionID, form_data.userID, form_data.paymentID)

        return {"success": True, "message": "Mensaje enviado correctamente"}
    except Exception as error:
        print(f"Error en submit_form: {error}")
        raise HTTPException(status_code=500, detail=str(error))

@app.get("/")
async def root():
    return {"message": "FastAPI server is running."}

async def handle_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        query = update.callback_query
        if query and query.data:
            callback_data = query.data
            
            # URL base de tu API (ajusta esto según tu configuración)
            api_base_url = os.getenv('API_BASE_URL')
            
            async with httpx.AsyncClient() as client:
                if callback_data.startswith("confirm_"):
                    _, transaction_id, user_id, payment_id = callback_data.split("_")
                    
                    print(f"Confirmar transacción: {transaction_id}, {user_id}, {payment_id}")
                    # Hacer la petición a tu API para confirmar
                    try:
                        response = await client.post(
                            f"{api_base_url}/transactions/confirm",
                            json={
                                "transactionId": transaction_id,
                                "userId": user_id,
                                "paymentId": payment_id,
                                "status": "confirmed"
                            }
                        )
                        response.raise_for_status()
                        
                        # Si la petición fue exitosa, responder al usuario
                        await query.message.reply_text(
                            f"✅ Transacción {transaction_id} confirmada exitosamente."
                        )
                    except httpx.HTTPError as e:
                        await query.message.reply_text(
                            f"❌ Error al confirmar la transacción: {str(e)}"
                        )
                    
                elif callback_data.startswith("deny_"):
                    _, transaction_id, user_id, payment_id = callback_data.split("_")
                    
                    print(f"Denegar transacción: {transaction_id}, {user_id}, {payment_id}")
                    # Hacer la petición a tu API para denegar
                    try:
                        response = await client.post(
                            f"{api_base_url}/transactions/deny",
                            json={
                                "transactionId": transaction_id,
                                "userId": user_id,
                                "paymentId": payment_id,
                                "status": "denied"
                            }
                        )
                        response.raise_for_status()
                        
                        # Si la petición fue exitosa, responder al usuario
                        await query.message.reply_text(
                            f"❌ Transacción {transaction_id} denegada exitosamente."
                        )
                    except httpx.HTTPError as e:
                        await query.message.reply_text(
                            f"❌ Error al denegar la transacción: {str(e)}"
                        )
                
                # Siempre responder al callback query para quitar el estado de "loading"
                await query.answer()
                
    except Exception as error:
        print(f"Error al procesar el callback: {error}")
        if query:
            await query.message.reply_text("❌ Ocurrió un error al procesar la solicitud.")

# --- Handlers del Bot de Telegram ---
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("¡Hola! Soy un bot integrado con FastAPI.")


bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
if not bot_token:
    raise ValueError("TELEGRAM_BOT_TOKEN not configured")
    
application = Application.builder().token(bot_token).build()
application.add_handler(CallbackQueryHandler(handle_callback))
application.add_handler(CommandHandler("start", start))

""" # Initialize the bot
bot_app = setup_bot()
async def start_bot():
    print("Starting Telegram bot...")
    await bot_app.initialize()
    await bot_app.start()
    print("Telegram bot started successfully!")
    await bot_app.run_polling()

if __name__ == "__main__":
    asyncio.create_task(start_bot())
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8000))) """
    
async def run_bot_and_api():
    # Configurar el servidor FastAPI en segundo plano
    server = uvicorn.Server(
        config=uvicorn.Config(
            app=app,
            host="0.0.0.0",
            port=8000,
            reload=False
        )
    )

    # Iniciar el bot y el servidor concurrentemente
    async with application:
        print("Starting Telegram bot...")
        await application.initialize()
        await application.start()
        print("Telegram bot started successfully!")
        await server.serve()
        await application.stop()

if __name__ == "__main__":
    asyncio.run(run_bot_and_api())