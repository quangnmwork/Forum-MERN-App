export function convertTime(date) {
  const datee = new Date(`${date}`);
  const newDate = Date.now();
  var seconds = Math.floor((newDate - datee.getTime()) / 1000);
  var interval = seconds / 31536000;
  // console.log(interval);

  if (interval > 1) {
    return Math.floor(interval) + " năm trước";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " tháng trước";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " ngày trước";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " giờ trước";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " phút trước";
  }
  return "Vừa xong";
}
