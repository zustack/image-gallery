package routes

import (
	"image-gallery/api/handlers"
	"image-gallery/api/middleware"

	"github.com/gofiber/fiber/v2"
)

func PostRoutes(app *fiber.App) {
	app.Delete("/posts", middleware.User, handlers.DeletePost)
  app.Post("/posts/webhook", handlers.WebhookZustack)
	app.Get("/posts", middleware.User, handlers.GetPosts)
	app.Post("/posts", middleware.User, handlers.CreatePost)
}
