const xhr = new XMLHttpRequest();
xhr.open("GET", "https://gist.githubusercontent.com/MattIPv4/045239bc27b16b2bcf7a3a9a4648c08a/raw/2411e31293a35f3e565f61e7490a806d4720ea7e/bee%2520movie%2520script");
xhr.send();
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const data = xhr.response;
    console.log(data);
    let htmlText = ""
    let textLine = data.split("\n");
    console.log(textLine)
    for (let i=0;i<textLine.length;i++) {
        if (textLine[i]!=="") {
            htmlText += "<p style='line-height: 5px;font-size: 15px;margin: 10px;'>"+textLine[i]+"</p>"
        } else {
            htmlText += "<p style='line-height: 5px;font-size: 15px;margin: 10px;'></p><br style='display: block;content: \"\";margin-top: 20px;'> "
        }
    }
    document.getElementById("text").innerHTML = htmlText
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};
