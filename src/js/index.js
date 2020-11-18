import Flickity from 'flickity';
import 'flickity/css/flickity.css';

const carousel = new Flickity('.main-carousel', {
  cellAlign: 'left',
  contain: true,
  groupCells: true,
});
