// Middleware для обробких status 404

export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  };
