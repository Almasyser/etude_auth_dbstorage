// renvoyer le contenu d'un dossier dans un Array.
// dans le code:
// import datas from "../../../public/Datas";
// Datas contient les fichiers et index.js
const images = import.meta.glob('./*.jpg', { eager: true });

const parsed = {};
for (const path in images) {
  const name = path.split('/').pop().replace('.jpg', '');
  parsed[name] = images[path].default;
}

export default parsed;