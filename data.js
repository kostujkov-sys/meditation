/*
  ===========================================
  ЗДЕСЬ ТЫ ДОБАВЛЯЕШЬ СВОИ МЕДИТАЦИИ
  ===========================================

  1. Закидываешь mp3-файл в папку assets/audio/
  2. Прописываешь его сюда в нужный модуль
  3. title — название, которое увидит пользователь
  4. file  — путь к файлу, начинается с "assets/audio/"

  Можно добавлять сколько угодно медитаций в каждый модуль —
  просто копируй блок { title: ..., file: ... }, и не забывай
  ставить запятую между блоками.
*/

const MODULES = {
  1: {
    title: "Очищение",
    cover: "assets/module1.jpg",
    meditations: [
      // { title: "Медитация на расслабление", file: "assets/audio/module1_01.mp3" },
      // { title: "Очищение от негатива", file: "assets/audio/module1_02.mp3" },
    ]
  },
  2: {
    title: "Самоценность",
    cover: "assets/module2.jpg",
    meditations: [
      // { title: "Любовь к себе", file: "assets/audio/module2_01.mp3" },
    ]
  },
  3: {
    title: "Магнетизм",
    cover: "assets/module3.jpg",
    meditations: [
      // { title: "Притяжение людей", file: "assets/audio/module3_01.mp3" },
    ]
  },
  4: {
    title: "Здоровье и красота",
    cover: "assets/module4.jpg",
    meditations: [
      // { title: "Энергия и красота", file: "assets/audio/module4_01.mp3" },
    ]
  }
};
