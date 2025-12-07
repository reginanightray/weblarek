import { CardDefault } from "./CardDefault";
import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { categoryMap } from "../../utils/constants";
import { CDN_URL } from "../../utils/constants";
import { ICardActions } from "../../types";

type CategoryKey = keyof typeof categoryMap;

export class CardCatalog extends CardDefault {
  private image: HTMLImageElement;
  private category: HTMLElement;
  constructor(protected container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.image = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.category = ensureElement('.card__category', this.container);
    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set categoryValue(value: string) {
    if(this.category) {
      Object.values(categoryMap).forEach(cls => this.category.classList.remove(cls))
      const key = value as CategoryKey;
      this.category.classList.add(key in categoryMap ? categoryMap[key] : categoryMap['другое']);
      this.category.textContent = value;
    }
  }

  set imageSrc(src: string) {
    this.setImage(this.image, `${CDN_URL}/${src}`, this.title.textContent);
  }

  render(data: Partial<IProduct>) : HTMLElement {
    super.render(data);
    if (data.category !== undefined) this.categoryValue = data.category;
    if (data.image !== undefined) this.imageSrc = data.image;
    return this.container
  }
}