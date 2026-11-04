export const WHATSAPP_NUMBER = '201027243191';

export const deliveryLocations = {
  cities: [
    { id: 'mallawi', name: 'ملوي', fee: 70 },
    { id: 'deir-mawas', name: 'دير مواس', fee: 10 },
  ],

villages: [
  { id: 'bani-imran', name: 'قرية بني عمران', fee: 0 },
  { id: 'el-hasaybah', name: 'قرية الحسايبة', fee: 15 },
  { id: 'bani-haram', name: 'قرية بني حارم', fee: 20 },
  { id: 'tanawaf', name: 'قرية تانواف', fee: 20 },
  { id: 'el-omareya-el-sharqeya', name: 'قرية العمرية الشرقية', fee: 30 },
  { id: 'el-omareya-el-gharbeya', name: 'قرية العمرية الغربية', fee: 20},
  { id: 'el-hag-qandil', name: 'قرية الحج قنديل', fee: 25 },
],
};

export const allDeliveryLocations = [
  ...deliveryLocations.cities,
  ...deliveryLocations.villages,
];