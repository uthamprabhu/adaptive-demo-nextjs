export function isMobileUA(ua) {
  const r =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|CriOS/i;
  return r.test(ua || "");
}