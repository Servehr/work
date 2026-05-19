export default function readableFileSize(attachmentSize: number) 
{
    const DEFAULT_SIZE = 0;
    const fileSize = attachmentSize ?? DEFAULT_SIZE;
      
    if (!fileSize) 
    {
        return `${DEFAULT_SIZE} kb`;
    }
      
    const sizeInKb = fileSize / 1024;
      
    if (sizeInKb > 1024) {
       return `${(sizeInKb / 1024).toFixed(2)} mb`;
    } else {
        return `${sizeInKb.toFixed(2)} kb`;
    }
}

export async function reduceImageSize(base64String: string)
{
    let reducedImage = await new Promise((resolve) => 
    {
        let img = new Image()
        img.src = base64String
        img.onload = () => 
        {
            let canvas = document.createElement('canvas')

            let workedImage: CanvasRenderingContext2D = canvas.getContext('2d')!
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            workedImage.drawImage(img, 0, 0)
            canvas.toBlob((blob: any) => 
            {                       
              const fr: FileReader = new FileReader()
              fr.readAsDataURL(blob)
              fr.addEventListener('load', () => 
              {   
                  const dataUrl = fr.result
                  const picture: HTMLImageElement | ArrayBuffer | string = new Image()
                  picture.src = dataUrl as string
                  resolve(dataUrl)
              })
            }, 'image/webp', 0.1)
        }
      })
      return reducedImage
}