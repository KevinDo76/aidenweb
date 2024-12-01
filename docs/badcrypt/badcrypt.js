//a pretty bad substituion cipher with the sha digest of the password and padding
function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
      return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
    });
}
  
function wrapNumber(number, offset)
{
    let offsetNumber = number-32;
    let added = offsetNumber + offset;
    if (added<0)
    {
        return 94+added + 32;
    } else if (added > 94) {
        return added-94 + 32;
    } else {
        return added+32;
    }
}

function encrypt(plaintext, passDigest)
{
    let cipher = "";
    let paddedPlaintext = plaintext.padEnd(128," ");
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
    return plaintext.replace(/\s+$/, '');
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

setInterval(encrypt_loop, 1);
setInterval(decrypt_loop, 1);

  // prints: 4dc43467fe9140f217821252f94be94e49f963eed1889bceab83a1c36ffe3efe87334510605a9bf3b644626ac0cd0827a980b698efbc1bde75b537172ab8dbd0"