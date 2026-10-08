import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system/legacy';

export async function exportExcel(rows: any[], filename = 'financial-report.xlsx', companyName='FINANCE360', reportTitle='Financial Report') {
  const generated = new Date().toLocaleString();
  const headers = rows.length ? Object.keys(rows[0]) : ['Receipt ID','Customer Name','Date','Time','Amount','Area','Collector Name / Login','Payment Method','Reference / UTR','Status'];
  const data = [
    [companyName],
    [reportTitle],
    [`Generated Date & Time: ${generated}`],
    [],
    headers,
    ...rows.map(r=>headers.map(h=>r[h] ?? ''))
  ];
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws['!merges'] = [
    {s:{r:0,c:0},e:{r:0,c:Math.max(headers.length-1,0)}},
    {s:{r:1,c:0},e:{r:1,c:Math.max(headers.length-1,0)}},
    {s:{r:2,c:0},e:{r:2,c:Math.max(headers.length-1,0)}}
  ];
  ws['!cols'] = headers.map(h=>({wch: Math.min(Math.max(String(h).length+5,14),28)}));
  if (ws['A1']) ws['A1'].v = `◉ ${companyName}`;
  if (ws['A2']) ws['A2'].v = reportTitle;
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Report');
  const base64 = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
  const uri = `${FileSystem.cacheDirectory}${filename}`;
  await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
  if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(uri, {mimeType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  return uri;
}

export async function exportPdf(title: string, html: string) {
  const result = await Print.printToFileAsync({ html: `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"/><style>body{font-family:Arial,sans-serif;color:#16283F}table{page-break-inside:auto}tr{page-break-inside:avoid;page-break-after:auto}</style></head><body>${html}</body></html>` });
  if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(result.uri, { mimeType: 'application/pdf' });
  return result.uri;
}
