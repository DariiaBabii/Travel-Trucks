import css from "./ItemPhoto.module.css";

const ItemPhoto = ({ gallery, showAll = false }) => {
  if (!gallery || gallery.length === 0) return null;

  if (!showAll) {
    const mainPhoto = gallery[0].thumb || "photo-of-vehicle";

    return (
      <div className={css.containerPhoto}>
        <img
          className={css.itemPhoto}
          src={mainPhoto}
          alt="Vehicle"
          width={292}
          height={320}
        />
      </div>
    );
  }

  return (
    <ul className={css.itemDetailList}>
      {gallery.map((image, index) => (
        <li key={index} className={css.imgItem}>
          <div className={css.containerPhoto}>
            <img
              className={css.itemPhoto}
              src={image.thumb}
              alt={`Vehicle ${index + 1}`}
              width={292}
              height={312}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemPhoto;
