export type PuzzleCharacter = {
  id: string;
  nameTh: string;
  emoji: string;
  sound: string;
  color: string;
  category?: string;
};

export type Animal = PuzzleCharacter;

export const ANIMALS: Animal[] = [
  { id: "dog", nameTh: "หมาน้อย", emoji: "🐶", sound: "บ็อก บ็อก! เก่งมาก นี่คือหมาน้อย!", color: "#FFE29A" },
  { id: "cat", nameTh: "แมวเหมียว", emoji: "🐱", sound: "เมี้ยว เมี้ยว! เก่งมาก นี่คือแมวเหมียว!", color: "#FFC2D1" },
  { id: "fox", nameTh: "จิ้งจอกน้อย", emoji: "🦊", sound: "โฮ่ง โฮ่ง! เก่งมาก นี่คือจิ้งจอกน้อย!", color: "#FFD8A9" },
  { id: "rabbit", nameTh: "กระต่ายน้อย", emoji: "🐰", sound: "กระโดด เก่งมาก! นี่คือกระต่ายน้อย!", color: "#CDE7FF" },
  { id: "panda", nameTh: "หมีแพนด้า", emoji: "🐼", sound: "เก่งมาก! นี่คือหมีแพนด้า!", color: "#E4E4E4" },
  { id: "lion", nameTh: "สิงโตราชา", emoji: "🦁", sound: "แกร๊วๆ! เก่งมาก นี่คือสิงโตราชา!", color: "#FFE0A3" },
  { id: "tiger", nameTh: "เสือลายพาดกลอน", emoji: "🐯", sound: "คำราม! เก่งมาก นี่คือเสือ!", color: "#FFD1A9" },
  { id: "penguin", nameTh: "เพนกวินน้อย", emoji: "🐧", sound: "ว๊อก ว๊อก! เก่งมาก นี่คือเพนกวิน!", color: "#C8E7FF" },
  { id: "elephant", nameTh: "ช้างน้อย", emoji: "🐘", sound: "ปู๊น ปู๊น! เก่งมาก นี่คือช้างน้อย!", color: "#D8E1F0" },
  { id: "giraffe", nameTh: "ยีราฟคอยาว", emoji: "🦒", sound: "เก่งมาก! นี่คือยีราฟคอยาว!", color: "#FFE38B" },
  { id: "monkey", nameTh: "ลิงจอมซน", emoji: "🐵", sound: "เจี๊ยก เจี๊ยก! นี่คือลิงจอมซน!", color: "#DDBB9B" },
  { id: "bear", nameTh: "หมีตัวโต", emoji: "🐻", sound: "เก่งมาก! นี่คือหมีตัวโต!", color: "#D9B89C" },
  { id: "koala", nameTh: "โคอาลาน้อย", emoji: "🐨", sound: "เก่งมาก! นี่คือโคอาลาน้อย!", color: "#D4DFE5" },
  { id: "frog", nameTh: "กบน้อย", emoji: "🐸", sound: "อ๊บ อ๊บ! เก่งมาก นี่คือกบน้อย!", color: "#BFE8A5" },
  { id: "turtle", nameTh: "เต่าต้วมเตี้ยม", emoji: "🐢", sound: "เก่งมาก! นี่คือเต่าต้วมเตี้ยม!", color: "#B7DEB0" },
  { id: "dolphin", nameTh: "โลมาร่าเริง", emoji: "🐬", sound: "เก่งมาก! นี่คือโลมาร่าเริง!", color: "#A9DDF2" },
  { id: "whale", nameTh: "วาฬใจดี", emoji: "🐳", sound: "เก่งมาก! นี่คือวาฬใจดี!", color: "#A9DDF2" },
  { id: "octopus", nameTh: "หมึกน้อย", emoji: "🐙", sound: "เก่งมาก! นี่คือหมึกน้อย!", color: "#F3B6C9" },
  { id: "chick", nameTh: "ลูกเจี๊ยบ", emoji: "🐥", sound: "เจี๊ยบ เจี๊ยบ! นี่คือลูกเจี๊ยบ!", color: "#FFF0A8" },
  { id: "owl", nameTh: "นกฮูกตาโต", emoji: "🦉", sound: "ฮูก ฮูก! นี่คือนกฮูกตาโต!", color: "#CDB7A7" },
  { id: "horse", nameTh: "ม้าคึกคัก", emoji: "🐴", sound: "ฮี้ ฮี้! เก่งมาก นี่คือม้า!", color: "#D7B39A" },
  { id: "pig", nameTh: "หมูน้อย", emoji: "🐷", sound: "อู๊ด อู๊ด! นี่คือหมูน้อย!", color: "#FFC4CF" },
  { id: "cow", nameTh: "แม่วัวใจดี", emoji: "🐮", sound: "มอ มอ! เก่งมาก นี่คือวัว!", color: "#E9E6DD" },
];

export const CHARACTERS: PuzzleCharacter[] = [
  ...ANIMALS.map((character) => ({ ...character, category: "สัตว์" })),
  { id: "dinosaur-long", nameTh: "ไดโนเสาร์คอยาว", emoji: "🦕", sound: "เก่งมาก! นี่คือไดโนเสาร์คอยาว!", color: "#C9E8B1", category: "ไดโนเสาร์" },
  { id: "dinosaur-trex", nameTh: "ทีเร็กซ์จอมซน", emoji: "🦖", sound: "เก่งมาก! นี่คือทีเร็กซ์!", color: "#B7DDA4", category: "ไดโนเสาร์" },
  { id: "unicorn", nameTh: "ยูนิคอร์นสายรุ้ง", emoji: "🦄", sound: "เก่งมาก! นี่คือยูนิคอร์น!", color: "#F4C8EA", category: "แฟนตาซี" },
  { id: "dragon", nameTh: "มังกรน้อย", emoji: "🐉", sound: "เก่งมาก! นี่คือมังกรน้อย!", color: "#B9E5C2", category: "แฟนตาซี" },
  { id: "mermaid", nameTh: "นางเงือก", emoji: "🧜‍♀️", sound: "เก่งมาก! นี่คือนางเงือก!", color: "#B9E7E7", category: "แฟนตาซี" },
  { id: "fairy", nameTh: "นางฟ้าตัวจิ๋ว", emoji: "🧚", sound: "เก่งมาก! นี่คือนางฟ้า!", color: "#E7D0F5", category: "แฟนตาซี" },
  { id: "robot", nameTh: "หุ่นยนต์เพื่อนรัก", emoji: "🤖", sound: "ปิ๊บ ป๊าบ! นี่คือหุ่นยนต์!", color: "#C8DDF3", category: "แฟนตาซี" },
  { id: "alien", nameTh: "เอเลี่ยนยิ้มหวาน", emoji: "👽", sound: "เก่งมาก! นี่คือเอเลี่ยน!", color: "#C8EAAE", category: "แฟนตาซี" },
  { id: "friendly-ghost", nameTh: "ผีน้อยใจดี", emoji: "👻", sound: "บู๊! นี่คือผีน้อยใจดี!", color: "#E1E7F5", category: "แฟนตาซี" },
  { id: "superhero", nameTh: "ฮีโร่ตัวจิ๋ว", emoji: "🦸", sound: "ฮีโร่มาแล้ว! เก่งมาก!", color: "#F7C4B8", category: "แฟนตาซี" },
  { id: "princess", nameTh: "เจ้าหญิงแสนสวย", emoji: "👸", sound: "เก่งมาก! นี่คือเจ้าหญิง!", color: "#F5CDE0", category: "แฟนตาซี" },
  { id: "prince", nameTh: "เจ้าชายใจดี", emoji: "🤴", sound: "เก่งมาก! นี่คือเจ้าชาย!", color: "#C9D8F5", category: "แฟนตาซี" },
  { id: "wizard", nameTh: "พ่อมดนักเวท", emoji: "🧙", sound: "เก่งมาก! นี่คือพ่อมด!", color: "#D4C5ED", category: "แฟนตาซี" },
  { id: "astronaut", nameTh: "นักบินอวกาศ", emoji: "🧑‍🚀", sound: "พร้อมออกเดินทางสู่อวกาศ!", color: "#C7D7EE", category: "อวกาศ" },
  { id: "rocket", nameTh: "จรวดทะยานฟ้า", emoji: "🚀", sound: "ฟิ้ว! จรวดออกเดินทางแล้ว!", color: "#F4C4B8", category: "อวกาศ" },
  { id: "saturn", nameTh: "ดาวเสาร์วงแหวน", emoji: "🪐", sound: "เก่งมาก! นี่คือดาวเสาร์!", color: "#E9D5A7", category: "อวกาศ" },
  { id: "moon", nameTh: "พระจันทร์ยิ้ม", emoji: "🌙", sound: "ราตรีสวัสดิ์จากพระจันทร์!", color: "#D9E4F3", category: "อวกาศ" },
  { id: "star", nameTh: "ดาวน้อยระยิบระยับ", emoji: "⭐", sound: "เปล่งประกายเลย! นี่คือดาว!", color: "#FFE89A", category: "อวกาศ" },
  { id: "sun", nameTh: "พระอาทิตย์สดใส", emoji: "☀️", sound: "สวัสดีตอนเช้า! นี่คือพระอาทิตย์!", color: "#FFD77A", category: "อวกาศ" },
  { id: "ufo", nameTh: "จานบินลึกลับ", emoji: "🛸", sound: "วู้บ! จานบินมาแล้ว!", color: "#C7E7DC", category: "อวกาศ" },
  { id: "comet", nameTh: "ดาวหางหางยาว", emoji: "☄️", sound: "วาบ! นี่คือดาวหาง!", color: "#F6C4A5", category: "อวกาศ" },
  { id: "apple", nameTh: "แอปเปิลแดง", emoji: "🍎", sound: "กรอบกรอบ! นี่คือแอปเปิล!", color: "#F5C1BC", category: "ของกิน" },
  { id: "banana", nameTh: "กล้วยหอม", emoji: "🍌", sound: "หอมหวาน! นี่คือกล้วย!", color: "#FFE99A", category: "ของกิน" },
  { id: "strawberry", nameTh: "สตรอว์เบอร์รี", emoji: "🍓", sound: "หวานฉ่ำ! นี่คือสตรอว์เบอร์รี!", color: "#F7C2C4", category: "ของกิน" },
  { id: "watermelon", nameTh: "แตงโมหวานฉ่ำ", emoji: "🍉", sound: "เย็นชื่นใจ! นี่คือแตงโม!", color: "#C2E5B7", category: "ของกิน" },
  { id: "pineapple", nameTh: "สับปะรด", emoji: "🍍", sound: "เก่งมาก! นี่คือสับปะรด!", color: "#F6D995", category: "ของกิน" },
  { id: "grapes", nameTh: "องุ่นพวงโต", emoji: "🍇", sound: "เก่งมาก! นี่คือองุ่น!", color: "#D9C6EA", category: "ของกิน" },
  { id: "donut", nameTh: "โดนัทโรยน้ำตาล", emoji: "🍩", sound: "อร่อยจัง! นี่คือโดนัท!", color: "#EFC7AF", category: "ของกิน" },
  { id: "cupcake", nameTh: "คัพเค้กสีหวาน", emoji: "🧁", sound: "สุขสันต์วันพิเศษ! นี่คือคัพเค้ก!", color: "#F4CDE0", category: "ของกิน" },
  { id: "ice-cream", nameTh: "ไอศกรีมเย็นฉ่ำ", emoji: "🍦", sound: "เย็นจัง! นี่คือไอศกรีม!", color: "#D7EAF2", category: "ของกิน" },
  { id: "pizza", nameTh: "พิซซ่าชีสยืด", emoji: "🍕", sound: "หอมอร่อย! นี่คือพิซซ่า!", color: "#F4D29A", category: "ของกิน" },
  { id: "burger", nameTh: "เบอร์เกอร์ชิ้นโต", emoji: "🍔", sound: "มื้ออร่อยมาแล้ว! นี่คือเบอร์เกอร์!", color: "#E8C49B", category: "ของกิน" },
  { id: "sushi", nameTh: "ซูชิคำจิ๋ว", emoji: "🍣", sound: "เก่งมาก! นี่คือซูชิ!", color: "#F3CBC0", category: "ของกิน" },
  { id: "car", nameTh: "รถแข่งสีแดง", emoji: "🏎️", sound: "บรื้น บรื้น! รถแข่งออกตัวแล้ว!", color: "#F4BDBA", category: "ยานพาหนะ" },
  { id: "bus", nameTh: "รถบัสคันใหญ่", emoji: "🚌", sound: "ขึ้นรถได้เลย! นี่คือรถบัส!", color: "#F6E09B", category: "ยานพาหนะ" },
  { id: "train", nameTh: "รถไฟฉึกฉัก", emoji: "🚂", sound: "ฉึกฉัก ฉึกฉัก! รถไฟมาแล้ว!", color: "#C8DDF0", category: "ยานพาหนะ" },
  { id: "airplane", nameTh: "เครื่องบินลำใหญ่", emoji: "✈️", sound: "เหินฟ้าไปด้วยกัน! นี่คือเครื่องบิน!", color: "#C7E4F3", category: "ยานพาหนะ" },
  { id: "helicopter", nameTh: "เฮลิคอปเตอร์", emoji: "🚁", sound: "ปั่บ ปั่บ! นี่คือเฮลิคอปเตอร์!", color: "#D9E8AE", category: "ยานพาหนะ" },
  { id: "ship", nameTh: "เรือสำราญ", emoji: "🛳️", sound: "ล่องทะเลกันเถอะ! นี่คือเรือ!", color: "#BDE0ED", category: "ยานพาหนะ" },
  { id: "tractor", nameTh: "รถแทรกเตอร์", emoji: "🚜", sound: "ลุยไร่นากัน! นี่คือรถแทรกเตอร์!", color: "#E8D79B", category: "ยานพาหนะ" },
  { id: "bicycle", nameTh: "จักรยานคันเก่ง", emoji: "🚲", sound: "ปั่นไปด้วยกัน! นี่คือจักรยาน!", color: "#C9E5CE", category: "ยานพาหนะ" },
  { id: "scooter", nameTh: "สกู๊ตเตอร์", emoji: "🛴", sound: "ไถลไปเลย! นี่คือสกู๊ตเตอร์!", color: "#E8D0E7", category: "ยานพาหนะ" },
  { id: "fire-engine", nameTh: "รถดับเพลิง", emoji: "🚒", sound: "ปี๊บ ป่อ! รถดับเพลิงมาแล้ว!", color: "#F3BDB9", category: "ยานพาหนะ" },
  { id: "flower", nameTh: "ดอกไม้ยิ้มแฉ่ง", emoji: "🌼", sound: "สดใสจัง! นี่คือดอกไม้!", color: "#F7E9A9", category: "ธรรมชาติ" },
  { id: "sunflower", nameTh: "ทานตะวันตัวโต", emoji: "🌻", sound: "หันหน้ารับแสงกัน! นี่คือทานตะวัน!", color: "#F6DF94", category: "ธรรมชาติ" },
  { id: "rainbow", nameTh: "สายรุ้งเจ็ดสี", emoji: "🌈", sound: "สายรุ้งสวยจัง!", color: "#F3C6D8", category: "ธรรมชาติ" },
  { id: "cloud", nameTh: "ก้อนเมฆปุยนุ่น", emoji: "☁️", sound: "ลอยนุ่มนิ่มบนฟ้า! นี่คือเมฆ!", color: "#D9E8F2", category: "ธรรมชาติ" },
  { id: "mushroom", nameTh: "เห็ดหมวกแดง", emoji: "🍄", sound: "เก่งมาก! นี่คือเห็ด!", color: "#F3C3B8", category: "ธรรมชาติ" },
  { id: "cactus", nameTh: "กระบองเพชรจิ๋ว", emoji: "🌵", sound: "เก่งมาก! นี่คือกระบองเพชร!", color: "#C4E1BE", category: "ธรรมชาติ" },
  { id: "tree", nameTh: "ต้นไม้ใหญ่", emoji: "🌳", sound: "ต้นไม้ช่วยให้ร่มเงา!", color: "#BBDDB6", category: "ธรรมชาติ" },
  { id: "leaf", nameTh: "ใบไม้เขียว", emoji: "🍃", sound: "ปลิวไปตามสายลม! นี่คือใบไม้!", color: "#C8E5B7", category: "ธรรมชาติ" },
  { id: "lightning", nameTh: "สายฟ้าแปลบปลาบ", emoji: "⚡", sound: "เปรี้ยง! นี่คือสายฟ้า!", color: "#F7E69A", category: "ธรรมชาติ" },
  { id: "snowman", nameTh: "ตุ๊กตาหิมะ", emoji: "⛄", sound: "สวัสดีจากเมืองหิมะ!", color: "#D4E9F3", category: "ธรรมชาติ" },
  { id: "teddy", nameTh: "ตุ๊กตาหมีนุ่มนิ่ม", emoji: "🧸", sound: "กอดอุ่นๆ จากตุ๊กตาหมี!", color: "#E3C4A7", category: "ของเล่น" },
  { id: "ball", nameTh: "ลูกบอลเด้งดึ๋ง", emoji: "⚽", sound: "เตะบอลกันเถอะ!", color: "#D7E2E7", category: "ของเล่น" },
  { id: "kite", nameTh: "ว่าวลอยลม", emoji: "🪁", sound: "ว่าวลอยสูงแล้ว!", color: "#F2C9D6", category: "ของเล่น" },
  { id: "yo-yo", nameTh: "โยโย่หมุนติ้ว", emoji: "🪀", sound: "หมุนขึ้นหมุนลง! นี่คือโยโย่!", color: "#D6C8EF", category: "ของเล่น" },
  { id: "balloon", nameTh: "ลูกโป่งหลากสี", emoji: "🎈", sound: "ลอยขึ้นไปเลยลูกโป่ง!", color: "#F2C4C5", category: "ของเล่น" },
  { id: "gift", nameTh: "กล่องของขวัญ", emoji: "🎁", sound: "มีของขวัญมาให้!", color: "#EBC5D4", category: "ของเล่น" },
  { id: "guitar", nameTh: "กีตาร์เสียงใส", emoji: "🎸", sound: "มาเล่นดนตรีกัน! นี่คือกีตาร์!", color: "#E7C49E", category: "ของเล่น" },
  { id: "drum", nameTh: "กลองใบโต", emoji: "🥁", sound: "ตึ้ง ตึ้ง! นี่คือกลอง!", color: "#E8C7B7", category: "ของเล่น" },
];

export function characterImageUrl(emoji: string) {
  return `https://emojicdn.elk.sh/${encodeURIComponent(emoji)}?style=apple`;
}

export const animalImageUrl = characterImageUrl;