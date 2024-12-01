//a pretty bad substituion cipher with the sha digest of the password and padding
function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
      return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
    });
}
  
function wrapNumber(number, offset)
{
    let added = (number-32) + (offset);
    while (true) { 
        if (added<0)
        {
            console.log(95+added + 32,"c");
            added = 95+added;
        } else if (added > 95) {
            console.log(added%95 + 32,"b");
            added = added%95;
        } else {
            console.log(added+32,"a");
            return added+32;
        }
    }
}

function addPad(text)
{
    let returnText = text;
    returnText+="~";
    for (let i=0;i<(128-(text.length+1));i++)
    {
        returnText+=String.fromCharCode(Math.floor(Math.random()*90)+32);
    }
    
    return returnText;
}

function removePad(text)
{
    let returnText="";
    let isInPad=true;
    for (let i=text.length-1;i>=0;i--)
    {
        if (text.charAt(i)=='~' && isInPad)
        {
            isInPad = false;
            continue;
        }
        if (isInPad)
        {
            continue;
        }
        returnText = text.charAt(i) + returnText;
    }
    return returnText;
}

function encrypt(plaintext, passDigest)
{
    let cipher = "";
    //let paddedPlaintext = plaintext.padEnd(128," ");
    let paddedPlaintext = addPad(plaintext);
    console.log(paddedPlaintext.length);
    for (let i = 0;i<passDigest.length;i++)
    {
        let stringVar = wrapNumber(paddedPlaintext.charCodeAt(i), passDigest.charCodeAt(i));
        cipher+=String.fromCharCode(stringVar);
    }
    return cipher;
}

function decrypt(ciphertext, passDigest)
{
    let plaintext = "";
    for (let i = 0;i<passDigest.length;i++)
    {
        let stringVar = wrapNumber(ciphertext.charCodeAt(i), -passDigest.charCodeAt(i));
        plaintext+=String.fromCharCode(stringVar);
    }
    if (ciphertext.length < 128)
    {
        return "invalid length";
    }
    //return plaintext.replace(/\s+$/, '');
    return removePad(plaintext);
}

function setBox(id, text)
{
    document.getElementById(id).value = text;
}


function decrypt_loop()
{
    let password = document.getElementById("password-decrypt").value;
    let ciphertext = document.getElementById("inputText-decrypt").value;
    sha512(password).then(x => setBox("result-decrypt", decrypt(ciphertext, x)));
}

function encrypt_loop()
{
    let password = document.getElementById("password-encrypt").value;
    let plaintext = document.getElementById("inputText-encrypt").value;
    sha512(password).then(x => setBox("result-encrypt", encrypt(plaintext,x)));
}