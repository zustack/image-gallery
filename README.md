# 🖼️ Image Gallery with Zustack

This is a practical example of how to use the **Zustack API** with **Go** 
and **React**.
It demonstrates how to upload images to the Zustack network and display 
them efficiently in a web application.

---

## 🚀 How to Use

### 1. Clone the Repository

```bash
git clone https://github.com/zustack/image-gallery.git ~/image-gallery
cd ~/image-gallery
```

---

### 2. Set Up the Database

Run the following command to create the necessary tables in the SQLite database:

```bash
sqlite3 db.db ".read tables.sql"
```

---

### 3. Export Required Environment Variables

Create a `.env.sh` file and add your environment variables:

```bash
echo "export DB_PATH=/absolute/path/to/db.db
export SECRET_KEY=your_secret_key
export API_KEY_ZUSTACK=your_zustack_api_key
export BUCKET_ID=your_bucket_id
export ZUSTACK_URL=zustack_url" > .env.sh
```

Then load the environment:

```bash
source .env.sh
```

---

### 4. Run the Project

```bash
./image-gallery
```

> 📍 **App is running at:** [http://localhost:8081](http://localhost:8081)
