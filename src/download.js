import html2canvas from "html2canvas";

const download = async (capturedData) => {
    const canvas = await html2canvas(
        capturedData,
        {allowTaint: true, useCORS: true, logging: true}
        );

    const imgUrl = canvas.toDataURL("image/png", 1.0 );

    if(window.navigator.msSaveBlob) {// this will only true in IE browser
        ieDownload(canvas);
    }else{
        basicBrowserDownload(imgUrl);
    }
}

function basicBrowserDownload(imgUrl) {
    const a = window.document.createElement('a');
    a.style = 'display:none';
    a.download = 'Meme.png';
    a.href = imgUrl;
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    a.remove();
}

function ieDownload(canvas) {
    window.navigator.msSaveBlob(canvas.msToBlob(), 'Meme.png');
}

export default download;