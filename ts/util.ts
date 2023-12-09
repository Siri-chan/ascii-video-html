export function seconds_to_minutes(n: number) {
  const minutes = Math.floor(n / 60);
  const seconds = Math.floor(n % 60);
  const ms = Math.floor(((n % 60) * 100) - (seconds * 100));
  let seconds_str = seconds.toString();
  if (seconds < 10) {
    seconds_str = "0" + seconds_str;
  }
  let ms_str = ms.toString();
  if (ms < 10) {
    ms_str = "0" + ms_str;
  }
  return minutes.toString() + ":" + seconds_str + "." + ms_str;
}