// Скрипт для конвертации CSV в JavaScript массив
const fs = require('fs');
const path = require('path');

// Путь к CSV файлу
const csvFilePath = path.join(__dirname, 'phrase-author.csv');
// Путь к выходному JS файлу
const outputPath = path.join(__dirname, 'data.js');

// Чтение CSV файла
fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка при чтении файла:', err);
    return;
  }

  // Разбиваем CSV на строки
  const lines = data.split('\n');

  // Пропускаем заголовок
  const contentLines = lines.slice(1);

  // Создаем массив объектов
  const phrases = contentLines
    .filter(line => line.trim()) // Пропускаем пустые строки
    .map(line => {
      // Обработка CSV и разделение на фразу и автора
      // Примечание: это простой парсер, который не учитывает все случаи CSV
      let phrase = '';
      let author = '';
      
      // Если строка содержит кавычки, то нужно правильно разделить данные
      if (line.startsWith('"')) {
        // Найдем закрывающую кавычку фразы
        const phraseEndIndex = line.indexOf('",');
        if (phraseEndIndex !== -1) {
          // Извлекаем фразу без кавычек
          phrase = line.substring(1, phraseEndIndex);
          // Извлекаем автора, пропуская запятую после закрывающей кавычки фразы
          author = line.substring(phraseEndIndex + 2).trim();
        }
      } else {
        // Простой случай: разделяем по первой запятой
        const parts = line.split(',');
        phrase = parts[0];
        author = parts.slice(1).join(',');
      }
      
      return { phrase, author };
    });

  // Создаем экспортируемый массив в формате JavaScript
  const jsContent = `export const phrases = ${JSON.stringify(phrases, null, 2)};\n`;

  // Записываем результат в файл data.js
  fs.writeFile(outputPath, jsContent, 'utf8', err => {
    if (err) {
      console.error('Ошибка при записи файла:', err);
      return;
    }
    console.log('Файл успешно преобразован и сохранен:', outputPath);
  });
}); 