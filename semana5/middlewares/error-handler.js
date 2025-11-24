function errorHandler(err, req, res, next) {
  console.error("🔥 Error global:", err.message);

  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Error interno en el servidor"
  });
}

module.exports = errorHandler;
