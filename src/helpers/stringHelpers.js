function getPubDate(datestr) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let newdate = new Date(datestr);
  return `${newdate.getDate()} ${monthNames[newdate.getMonth()]}`
}

function getWebsiteString(str) {
  let strNoProocol = str.split('//')[1];
  let strNoPath = strNoProocol.split('.com')[0];
  let noDubs = strNoPath.replace('www.', '');
  return noDubs;
}

export { getPubDate, getWebsiteString };