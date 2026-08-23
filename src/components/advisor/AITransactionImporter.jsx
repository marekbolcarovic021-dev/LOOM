import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScanLine,
  X,
} from "lucide-react";

import { useFinance } from "../../context/FinanceContext";

import "./AITransactionImporter.css";

import ReceiptUploader from "./ReceiptUploader";
import ReceiptPreview from "./ReceiptPreview";


export default function AITransactionImporter() {

  const { t } = useTranslation();

  const {
    checkToken,
    consumeToken,
  } = useFinance();


  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [receiptData, setReceiptData] =
    useState(null);


  /*
   * ==========================================
   * HANDLE RECEIPT
   * ==========================================
   */

  async function handleReceipt(file) {

    if (!file) return;

    setLoading(true);

    try {

      /*
       * ==========================================
       * 1. CHECK TOKEN
       * ==========================================
       *
       * We only check here.
       * The token is NOT consumed yet.
       */

      const tokenResult =
        await checkToken();


      if (!tokenResult.allowed) {

        alert(
          "You have no LOOM Tokens left. Please buy more tokens."
        );

        return;
      }


      /*
       * ==========================================
       * 2. SEND RECEIPT TO AI
       * ==========================================
       */

      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );


      const response =
        await fetch(
          "/api/receipt",
          {
            method: "POST",
            body: formData,
          }
        );


      /*
       * AI/server failed
       *
       * IMPORTANT:
       * Token has NOT been consumed yet.
       */

      if (!response.ok) {

        throw new Error(
          "Receipt analysis failed."
        );
      }


      const data =
        await response.json();


      /*
       * ==========================================
       * 3. AI SUCCESSFUL
       * ==========================================
       *
       * NOW consume exactly one token.
       */

      const consumed =
        await consumeToken();


      if (!consumed.success) {

        console.error(
          "Token could not be consumed:",
          consumed
        );

        throw new Error(
          "Token could not be consumed."
        );
      }


      /*
       * ==========================================
       * 4. SHOW RESULT
       * ==========================================
       */

      setReceiptData(data);

    } catch (error) {

      console.error(
        "RECEIPT SCAN ERROR:",
        error
      );

      alert(
        "Receipt scanning failed. Your token was not consumed."
      );

    } finally {

      setLoading(false);

    }
  }


  /*
   * ==========================================
   * CLOSE MODAL
   * ==========================================
   */

  function closeModal() {

    setReceiptData(null);

    setLoading(false);

    setOpen(false);
  }


  /*
   * ==========================================
   * UI
   * ==========================================
   */

  return (
    <>

      <button
        className="advisor-action-btn receipt-scan-btn"
        onClick={() => setOpen(true)}
      >

        <ScanLine size={20} />

        <div>

          <strong>
            {t("scanReceipt")}
          </strong>

          <span>
            {t("scanReceiptDescription")}
          </span>

        </div>

      </button>


      {open && (

        <div className="receipt-overlay">

          <div className="receipt-modal">


            {/* HEADER */}

            <div className="receipt-header">

              <div>

                <h2>
                  {t("receiptScanner")}
                </h2>

                <p>
                  {t("receiptScannerDescription")}
                </p>

              </div>


              <button
                className="receipt-close"
                onClick={closeModal}
                disabled={loading}
              >

                <X size={20} />

              </button>

            </div>


            {/* UPLOAD */}

            {!receiptData && !loading && (

              <ReceiptUploader
                onUpload={handleReceipt}
              />

            )}


            {/* LOADING */}

            {loading && (

              <div className="receipt-loading">

                <div className="loader"></div>

                <h3>
                  {t("analyzingReceipt")}
                </h3>

                <p>
                  {t("pleaseWait")}
                </p>

              </div>

            )}


            {/* RESULT */}

            {receiptData && (

              <ReceiptPreview
                receipt={receiptData}
                closeModal={closeModal}
              />

            )}

          </div>

        </div>

      )}

    </>
  );
}
