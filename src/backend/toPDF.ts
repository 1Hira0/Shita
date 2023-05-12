import { jsPDF } from  "jspdf"

export async function toPDF(panels:{src:string}[]) {
    const pdf = new jsPDF();
    console.log(panels)
    for (const[i,panel] of panels.entries()) {
    const res = await fetch(`http://localhost:3000/fetch/?url=${panel.src}?method=imgBase64`)
    const imgBase64 = await res.text()//           ^^^^^^ - does simple fetch in node
    pdf.addImage(imgBase64, 'PNG', 0, 0, 0, 0, panel.src.split('/')[-1], 'SLOW')
    if (i !== panels.length - 1) {
        pdf.addPage();
      }
    }
    pdf.save('chPDF.pdf')
}