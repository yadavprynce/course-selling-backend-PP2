# course-selling-api-pp2

Things to learn from this one -
---Global error Middlewares
---Middleware-based Role Guard ( creating reusable middleware) so that we can use it like requireRole("INSTRUCTOR")
---PUT vs PATCH
PUT   → replace the ENTIRE resource (must send all fields) , in this you are bound to end those fields as well which you dont wanna change
PATCH → update PARTIAL resource (send only what changed) , but in this it just matches the keys sent in request to schema keys and ignores rest

