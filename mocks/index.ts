// Types
import { Content } from '../interfaces';

export const content: Content[] = [
  {
    _id: '1',
    type: 'text',
    text: 'Путин прислал Байдену на инаугурацию открытку в которой была всего одна строчка. "Ты у меня четвёртый."',
  }, {
    _id: '2',
    type: 'text',
    text: 'По данным пресс-центра МВД на несогласованные акции протеста по всей России вышло всего несколько сот человек. Более 2000 человек было задержано.',
  }, {
    _id: '3',
    type: 'image',
    source: 'https://www.spletnik.ru/img/2017/12/nastya/rkNBvn2mTwg.jpg',
    title: 'Meme'
  }, {
    _id: '4',
    type: 'image',
    text: 'with text',
    source: 'https://www.spletnik.ru/img/2017/12/nastya/kZ8CaVYru24.jpg'
  }, {
    _id: '5',
    type: 'youtube',
    source: 'https://youtu.be/SBPOp0LWeo0',
    title: 'З тими вікнами',
    text: 'A?'
  }, {
    _id: '6',
    type: 'youtube',
    source: 'https://youtu.be/YHyOTyTXXdA',
    title: 'Kurwa bober',
  },
];
