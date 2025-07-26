import Image from "next/image";
import * as React from "react";

type QrCodePreviewProps = {
  qrResult: string | null;
  merchantName: string;
  upiId: string;
};

export const QrCodePreview = React.forwardRef<HTMLDivElement, QrCodePreviewProps>(
  ({ qrResult, merchantName, upiId }, ref) => {
    return (
      <div ref={ref} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {qrResult && qrResult !== "error" ? (
          <div className="text-center">
            <h2 className="text-2xl text-black font-bold mb-4">{merchantName || "MERCHANT NAME"}</h2>
            <div className="bg-white p-4 rounded-lg inline-block">
              <Image src={qrResult} alt="QR Code" width={256} height={256} />
            </div>
            <p className="font-mono mt-4 text-black">{upiId || "merchant@upi"}</p>
            <p className="mt-4 text-zinc-600">
              Scan and pay with any BHIM UPI app
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <Image src="/bhim-upi.svg" alt="BHIM UPI" width={100} height={25} />
              <Image src="/gpay.svg" alt="Google Pay" width={50} height={25} />
              <Image src="/phonepe.svg" alt="PhonePe" width={70} height={25} />
              <Image src="/paytm.svg" alt="Paytm" width={70} height={25} />
            </div>
            <p className="text-xs text-zinc-500 mt-6">
              Create your own UPI QR code
            </p>
          </div>
        ) : (
          <div className="text-center text-zinc-500">
            <div className="w-64 h-64 bg-gray-200 dark:bg-zinc-800 mx-auto rounded-lg flex items-center justify-center">
              <p>QR Code will appear here</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

QrCodePreview.displayName = "QrCodePreview";
