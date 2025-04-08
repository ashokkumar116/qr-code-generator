import React, { useState } from 'react'



export const Qrcode = () => {
    const [qrData,setQrData]=useState("");
    const [qrSize,setQrSize]=useState("");
    const [img,setImg]=useState("");
    const [loading,setLoading]=useState(false);
    function generateQr(){
        
        try {
            setLoading(true)
            setImg(`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURI(qrData)}`)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false) 
        }

    }

    function downloadQr(){
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const link=document.createElement('a')
            link.href=URL.createObjectURL(blob)
            link.download="qrcode.png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }).catch((error)=>{
            console.log(error);
        })
    }

  return (
    <>
    <div className='qrcode-container flex flex-col justify-center items-center p-10 border-1 border-primary rounded-md shadow-2xl space-y-8  '>
        <h1 className='text-center text-4xl text-primary font-bold mb-5 uppercase'>Qr Code Generator</h1>
        {loading && <p>Please Wait....</p>}
        {img && <img src={img} alt="" />}
        <label htmlFor="qrData" className=''>Enter your URL : </label>
        <input type="text" id='qrData' value={qrData} onChange={(e)=>setQrData(e.target.value)} className='input input-primary' />
        <label htmlFor="qrSize" >Enter your image Size : </label>
        <input type="text" id='qrSize' value={qrSize} onChange={(e)=>setQrSize(e.target.value)} className='input input-primary' />
        <div className='buttons flex justify-between space-x-4 max-md:flex-col max-md:space-y-6 max-md:space-x-0'>
            <button className='generate btn btn-primary' disabled={(loading)} onClick={generateQr}>Generate QR code</button>
            <button className='btn btn btn-soft btn-success border-1 border-success' onClick={downloadQr}>Download QR code</button>
        </div>
        <p className='text-center text-sm text-primary'>&copy; Designed and Developed by <span className='font-bold'>ASHOK KUMAR P</span></p>
    </div>
    </>
  )
}
