import * as XLSX from 'xlsx';

export const exportMoviesToExcel = (movies) => {
    const worksheet = XLSX.utils.json_to_sheet(movies);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Movies');

    XLSX.writeFile(workbook, 'UpdatedMovies.xlsx');
};