const xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/KevinDo76/aidenweb/main/LICENSE");
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