import requests

base = "https://phishing-detector-4786.onrender.com/"

#response = requests.get(base+ "adult/Oni Chichi: Re-born")
response = requests.get(base+ "https://www.facelook.com")
print(response.json())