// Rate limiter simple en memoria por IP (sliding window fijo).
// LIMITACIÓN: el estado vive en el proceso Node — si Dokploy escala a múltiples
// instancias o se reinicia el proceso, el conteo se pierde/no se comparte.
// Suficiente para el volumen actual (single instance); si se escala horizontalmente,
// migrar a un store compartido (ej. Redis).
export function createRateLimiter({ windowMs = 60_000, max = 5 } = {}) {
  const hits = new Map() // ip -> { count, resetAt }

  // Limpieza periódica para no acumular IPs vencidas indefinidamente en memoria
  const cleanupInterval = setInterval(() => {
    const now = Date.now()
    for (const [ip, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(ip)
    }
  }, windowMs).unref()
  void cleanupInterval

  return function rateLimit(req, res, next) {
    const ip = req.ip ?? req.socket?.remoteAddress ?? 'unknown'
    const now = Date.now()
    const entry = hits.get(ip)

    if (!entry || entry.resetAt <= now) {
      hits.set(ip, { count: 1, resetAt: now + windowMs })
      return next()
    }

    if (entry.count >= max) {
      const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000)
      res.set('Retry-After', String(retryAfterSec))
      return res.status(429).json({ ok: false, message: 'Demasiadas solicitudes, intente más tarde.' })
    }

    entry.count += 1
    return next()
  }
}
