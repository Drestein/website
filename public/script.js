function websiteVisits(res) {
  localStorage.setItem("value", res.value);
  return res.value;
}
