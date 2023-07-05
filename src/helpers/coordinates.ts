export function parseDegreesToFloat(coord: string): number {
  const str: string = coord;
  let deg = "";
  let degEnd = false;
  let min = "";
  let minEnd = false;
  let sec = "";
  let secEnd = false;
  let dir = "";

  for (let i = 0; i < str.length; i++) {
    if (!degEnd) {
      if (str[i] == "°") {
        degEnd = true;
        continue;
      }
      deg += str[i];
    } else if (!minEnd) {
      if (str[i] == "'") {
        minEnd = true;
        continue;
      }
      min += str[i];
    } else if (!secEnd) {
      if (str[i] == '"') {
        secEnd = true;
        continue;
      }
      sec += str[i];
    }
  }
  dir = str[str.length - 1];
  sec = String(+sec / 3600);
  min = String(+min / 60);
  let result = 0;
  if (dir == "С" || dir == "В") {
    result = Number(+deg + min + sec);
  } else {
    result = -(+deg + min + sec);
  }
  return result;
}
export function parseLatToDegrees(coord: number): string {
  const deg = Math.trunc(Math.abs(coord));
  const min = Math.trunc((Math.abs(coord) % 1) * 60);
  const sec = Math.round((((Math.abs(coord) % 1) * 60) % 1) * 60);
  const dir = coord > 0 ? "С" : "Ю";
  return `
    ${deg < 10 ? "0" + deg : deg}°
    ${min < 10 ? "0" + min : min}'
    ${sec < 10 ? "0" + sec : sec}"
    ${dir}
  `;
}
export function parseLngToDegrees(coord: number): string  {
  const deg = Math.trunc(Math.abs(coord));
  const min = Math.trunc((Math.abs(coord) % 1) * 60);
  const sec = Math.round((((Math.abs(coord) % 1) * 60) % 1) * 60);
  const dir = coord > 0 ? "В" : "З";
  return `
    ${deg < 10 ? "0" + deg : deg}°
    ${min < 10 ? "0" + min : min}'
    ${sec < 10 ? "0" + sec : sec}"
    ${dir}
  `;
}
