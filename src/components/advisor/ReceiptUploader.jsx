import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Upload, ImagePlus } from "lucide-react";

export default function ReceiptUploader({ onUpload }) {
  const { t } = useTranslation();

  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  const [preview, setPreview] = useState(null);

  function validate(file) {
    if (!file) return false;

    if (!file.type.startsWith("image/")) {
      alert(t("onlyImagesAllowed"));
      return false;
    }

    return true;
  }

  function processFile(file) {
    if (!validate(file)) return;

    setPreview(URL.createObjectURL(file));

    onUpload(file);
  }

  function handleDrop(e) {
    e.preventDefault();

    setDragging(false);

    processFile(e.dataTransfer.files[0]);
  }

  function handleBrowse(e) {
    processFile(e.target.files[0]);
  }

  return (
    <div
      className={`receipt-upload-area ${
        dragging ? "dragging" : ""
      }`}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {!preview && (
        <>
          <div className="upload-icon">
            <Upload size={48} />
          </div>

          <h3>{t("uploadReceipt")}</h3>

          <p>{t("dragReceiptHere")}</p>

          <button
            className="browse-btn"
            onClick={() =>
              inputRef.current.click()
            }
          >
            <ImagePlus size={18} />

            {t("browseImage")}
          </button>
        </>
      )}

      {preview && (
        <img
          src={preview}
          alt=""
          className="receipt-preview-image"
        />
      )}

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleBrowse}
      />
    </div>
  );
}