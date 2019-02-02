# JOURNAL APP

## Initializing Firebase Authentication

Create a file in the root directory containing your Firebase authentication data called <em>settings.json</em>. 

It should look like this:

>{
  "type": "service_account",
  "project_id": "journalagent-db480",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "YOUR_PRIVATE_KEY",
  "client_email": "YOUR_CLIENT_EMAIL",
  "client_id": "YOUR_CLIENT_ID",
  "auth_uri": "YOUR_AUTH_URI",
  "token_uri": "YOUR_TOKEN_URI",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "CLIENT_X509"
}

This file can be downloaded from the Firestore console under <em>Settings -> Project Settings -> Service Accounts</em>, and clicking <em>Generate New Private Key</em>