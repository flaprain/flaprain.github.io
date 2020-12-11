// - Draw the logo wherever we want!
var bitmap = new Uint32Array([0x0, 0xa00, 0x400, 0x5540, 0x7fc0, 0x3f80, 0x3f80, 0x1f00, 0x1f00, 0x1f00, 0x3f80, 0xffe0, 0x3f80, 0x3f80, 0x3f83, 0x103f9f, 0x18103ffb, 0xe3fffd5, 0x1beabfab, 0x480d7fd5, 0xf80abfab, 0x480d7fd5, 0x1beabfab, 0xe3fffd5, 0x18107ffb, 0x107fdf, 0x7fc3, 0xffe0, 0xffe0, 0xffe0, 0x1fff0, 0x1fff0]);
document.querySelectorAll("canvas.logo").forEach((canvas) => {
    var context = canvas.getContext('2d');
    var idata = context.getImageData(0,0,512,512);
    var data = idata.data;
    data.fill(0xff);
    for (let y = 0; y < 512; y++) {
        let b32 = bitmap[y/16 | 0];
        for (let x = 0; x < 512; x++) {
            data[(x + y*512) * 4 + 3] = (b32 >> (x/16|0)) & 1 ? 0xff : 0;
        }
    }
    context.putImageData(idata,0,0);
});

// - Smart (OS detection) downloads:

var osRegex = { // only add more values here if you have added buttons for them in the CSS, or we wont know to fallback!
    iOS: /iPhone OS/,
    macOS: /Mac OS X/,
    Linux: /Linux/,
    // Windows: /Windows/, no windows support yet lol sorry :( ~ayden
};
var os = Object.keys(osRegex).find(key => osRegex[key].test(window.navigator.userAgent));

// 1. hide all links
document.querySelectorAll(".smart-downloads > *[show-if], .smart-downloads > .fallback").forEach((elem) => elem.style.display = "none");

// 2. show links only for our OS
if (os) {
    document.querySelectorAll(".smart-downloads > *[show-if='" + os + "']").forEach((elem) => elem.style.display = "inline");
} else {
    // if we didn't find an OS, just show the fallback again
    document.querySelectorAll(".smart-downloads > .fallback").forEach((elem) => elem.style.display = "block");
}