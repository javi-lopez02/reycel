import os
from telegram.ext import (
    Application,
    CommandHandler,
    CallbackQueryHandler,
    CallbackContext,
    ContextTypes,
)
from telegram import Update, ReplyKeyboardRemove
from dotenv import load_dotenv
import httpx

# Cargar variables de entorno
load_dotenv()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")


async def start(update: Update, context: CallbackContext):
    """Maneja el comando /start"""
    user = update.effective_user
    welcome_msg = (
        f"Hola {user.first_name}! 👋\n"
        "Soy tu bot de notificaciones SMS.\n"
        "Te enviaré alertas con opciones interactivas."
    )
    await update.message.reply_text(welcome_msg)


async def error_handler(update: Update, context: CallbackContext):
    """Maneja errores del bot"""
    print(f"Error: {context.error}")
    if update and update.message:
        await update.message.reply_text(
            "Ocurrió un error. Por favor intenta nuevamente."
        )


async def handle_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        query = update.callback_query
        hash = os.getenv("HASH")
        if query and query.data:
            callback_data = query.data

            # URL base de tu API (ajusta esto según tu configuración)
            api_base_url = os.getenv("API_BASE_URL")

            async with httpx.AsyncClient() as client:
                if callback_data.startswith("confirm_"):
                    _, transaction_id, payment_id = callback_data.split("_")

                    print(
                        f"Confirmar transacción: {transaction_id}, {payment_id}"
                    )
                    # Hacer la petición a tu API para confirmar
                    try:
                        response = await client.post(
                            f"{api_base_url}/transactions/confirm",
                            headers={"hash": hash},
                            json={
                                "transactionId": transaction_id,
                                "paymentId": payment_id,
                            },
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
                    _, transaction_id, payment_id = callback_data.split("_")

                    print(
                        f"Denegar transacción: {transaction_id}, {payment_id}"
                    )
                    # Hacer la petición a tu API para denegar
                    try:
                        response = await client.post(
                            f"{api_base_url}/transactions/denied",
                            headers={"hash": hash},
                            json={
                                "transactionId": transaction_id,
                                "paymentId": payment_id,
                            },
                        )
                        response.raise_for_status()

                        # Si la petición fue exitosa, responder al usuario
                        await query.message.reply_text(
                            f"❌ Transacción {transaction_id} denegada exitosamente. {payment_id}"
                        )
                    except httpx.HTTPError as e:
                        await query.message.reply_text(
                            f"❌ Error al denegar la transacción: {str(e)} datos -> {payment_id} {transaction_id}"
                        )

                # Siempre responder al callback query para quitar el estado de "loading"
                await query.answer()

    except Exception as error:
        print(f"Error al procesar el callback: {error}")
        if query:
            await query.message.reply_text(
                "❌ Ocurrió un error al procesar la solicitud."
            )


def setup_bot():
    """Configura y inicia el bot de Telegram"""
    application = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    # Manejadores de comandos
    application.add_handler(CommandHandler("start", start))

    application.add_handler(CallbackQueryHandler(handle_callback))

    # Manejador de errores
    application.add_error_handler(error_handler)

    print("Bot iniciado...")
    application.run_polling()


if __name__ == "__main__":
    setup_bot()
