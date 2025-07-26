# One-Qr-Gen Backend

This is the backend for the One-Qr-Gen application, a powerful and customizable QR code generator.

## API Endpoints

All endpoints are available under the `/api/v1` path.

### `/upi`

Generate a QR code for a UPI ID.

**Method:** `GET`

**Query Parameters:**

*   `upiid` (required): The UPI ID to encode.
*   `name` (required): The name of the recipient.
*   `...options`: Optional [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) options.

**Example:**

```
/api/v1/upi?upiid=your-upi-id@oksbi&name=Your%20Name
```

### `/upiaccount`

Generate a QR code for a bank account.

**Method:** `GET`

**Query Parameters:**

*   `acn` (required): The account number.
*   `ifsc` (required): The IFSC code of the bank.
*   `name` (required): The name of the account holder.
*   `...options`: Optional [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) options.

**Example:**

```
/api/v1/upiaccount?acn=1234567890&ifsc=SBIN0000001&name=Your%20Name
```

### `/vcard`

Generate a QR code for a vCard.

**Method:** `GET`

**Query Parameters:**

*   `name` (required): The name of the person.
*   `email` (required): The email address.
*   `phone` (required): The phone number.
*   `...options`: Optional [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) options.

**Example:**

```
/api/v1/vcard?name=Your%20Name&email=your.email@example.com&phone=1234567890
```

### `/url`

Generate a QR code for a URL.

**Method:** `GET`

**Query Parameters:**

*   `url` (required): The URL to encode.
*   `...options`: Optional [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) options.

**Example:**

```
/api/v1/url?url=https://www.google.com
```

### `/unique`

Generate a QR code for any text.

**Method:** `GET`

**Query Parameters:**

*   `text` (required): The text to encode (max 500 characters).
*   `...options`: Optional [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) options.

**Example:**

```
/api/v1/unique?text=Hello%20World
```

## Styling Options

All endpoints accept the same styling options as the [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) library. You can pass these options as query parameters. For example, to change the color of the dots, you can add `dotsOptions.color=%23ff0000` to the query string.

**Example:**

```
/api/v1/url?url=https://www.google.com&dotsOptions.color=%23ff0000
```

This will generate a QR code for `https://www.google.com` with red dots.
