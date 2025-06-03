# FastAPI Telegram Bot Project

This project is a FastAPI application that integrates with a Telegram bot to handle form submissions. It allows users to submit data through a form, which is then sent to a specified Telegram chat.

## Project Structure

```
fastapi-backend
├── app
│   ├── main.py          # Entry point of the FastAPI application
│   ├── telegram_bot.py  # Logic for the Telegram bot
│   └── schemas.py       # Data schemas for form validation
├── requirements.txt      # Project dependencies
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd fastapi-backend
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Telegram bot token:
   ```
   TELEGRAM_BOT_TOKEN=<your-telegram-bot-token>
   ```

## Running the Application

To start the FastAPI application, run the following command:
```
uvicorn app.main:app --reload
```

The application will be accessible at `http://localhost:8000`.

## Usage

1. Start a conversation with your Telegram bot and use the `/start` command to register your chat.
2. Submit the form data to the `/submit-form` endpoint. The data will be sent to the specified Telegram chat.

## License

This project is licensed under the MIT License.