# Video Gallery with Zustack

This is a practical example of how to integrate the **Zustack API** into 
a full-stack application using **Go** and **React**.

---

## Set up the database

Run the following command to create the necessary tables in the SQLite database:

```bash
sqlite3 db.db ".read tables.sql"
```

---

## Export the required environment variables

Before running the app, make sure to export the required environment variables:

```bash
export DB_PATH=/absolute/path/to/db.db
export SECRET_KEY=your_secret_key
export API_KEY_ZUSTACK=your_zustack_api_key
export BUCKET_ID=your_bucket_id
export ZUSTACK_URL=zustack_url
```

> You can also put these variables in a `.env.sh` file and run `source .env.sh` 
to load them automatically.

## How to use
Clone the repo and run
```bash
git clone https://github.com/zustack/image-gallery.git ~/image-gallery
cd image-gallery
go run cmd/main.go
```

Now open the on http://localhost:8081.
<<<<<<< HEAD
=======

read
export JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM1MDQ0ODY2ODksImlhdCI6MTc1MjIxNTQ4OSwibmJmIjoxNzUyMjE1NDg5LCJzY29wZSI6InJlYWQiLCJ1c2VyX2lkIjoiZmIxZGViYTEtNDY4MS00ZjY0LTllNDYtOTViZWVmOTExZWZhIn0.T8632wTuqVUSVPt8SPyZggOkdQ6kpRjYrg-nGXSq0wg
write
export JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM1MDQ0ODY3MTgsImlhdCI6MTc1MjIxNTUxOCwibmJmIjoxNzUyMjE1NTE4LCJzY29wZSI6IndyaXRlIiwidXNlcl9pZCI6ImZiMWRlYmExLTQ2ODEtNGY2NC05ZTQ2LTk1YmVlZjkxMWVmYSJ9.3ohk_WLPUyEXhwyMBdQK-vY2De0dyHktzUNj507plYQ

```bash
export BUCKET_ID=7593f484-4af6-4b76-a4de-b144d444323f 
export JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM1MDQ0ODY3MTgsImlhdCI6MTc1MjIxNTUxOCwibmJmIjoxNzUyMjE1NTE4LCJzY29wZSI6IndyaXRlIiwidXNlcl9pZCI6ImZiMWRlYmExLTQ2ODEtNGY2NC05ZTQ2LTk1YmVlZjkxMWVmYSJ9.3ohk_WLPUyEXhwyMBdQK-vY2De0dyHktzUNj507plYQ
export ACCESS=public   
export WEBP=yes        
export PATH_TO_FILE=@/home/agust/Pictures/back.png
```

```bash
curl -X POST "http://localhost:8080/files/upload/image/${BUCKET_ID}" \
  -H "Authorization: Bearer ${JWT}" \
  -H "Content-Type: multipart/form-data" \
  -F "access=${ACCESS}" \
  -F "webp=${WEBP}" \
  -F "file=${PATH_TO_FILE}"
```

>>>>>>> 540b635 (fix: fix token scope)
