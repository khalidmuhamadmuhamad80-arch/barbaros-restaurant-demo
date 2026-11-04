export const WHATSAPP_NUMBER = '201000000000';

export const deliveryLocations = {
  cities: [
    { id: 'minya', name: 'مدينة المنيا', fee: 20 },
    { id: 'mallawi', name: 'ملوي', fee: 30 },
    { id: 'samalout', name: 'سمالوط', fee: 30 },
    { id: 'abu-qurqas', name: 'أبو قرقاص', fee: 35 },
  ],

  villages: [
    { id: 'sheikh-fadl', name: 'قرية الشيخ فضل', fee: 25 },
    { id: 'bani-ahmed', name: 'قرية بني أحمد', fee: 30 },
    { id: 'taha-el-gabal', name: 'قرية طه الجبل', fee: 35 },
  ],
};

export const allDeliveryLocations = [
  ...deliveryLocations.cities,
  ...deliveryLocations.villages,
];