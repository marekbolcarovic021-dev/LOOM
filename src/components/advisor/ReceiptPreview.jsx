import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useFinance } from "../../context/FinanceContext";

import { formatCurrency } from "../../Utils/currency";

import {
    Check,
    Pencil,
    Trash2
} from "lucide-react";

export default function ReceiptPreview({

    receipt,

    closeModal

}) {

    const { t, i18n } = useTranslation();

    const {

        profile,

        accounts,

        transactions,

        setTransactions,

        setAccounts

    } = useFinance();

    const [editing,setEditing]=useState(false);

    const [rows,setRows]=useState(

        receipt.transactions || []

    );

    function updateRow(index,key,value){

        const copy=[...rows];

        copy[index][key]=value;

        setRows(copy);

    }

    function deleteRow(index){

        setRows(

            rows.filter((_,i)=>i!==index)

        );

    }

    function acceptTransactions(){

        let updatedAccounts=[...accounts];

        const newTransactions=[];

        rows.forEach(transaction=>{

            const accountId=

                transaction.accountId ||

                accounts[0].id;

            newTransactions.push({

                id:Date.now()+Math.random(),

                accountId,

                category:transaction.category,

                amount:Number(transaction.amount),

                type:transaction.type,

                date:

                    transaction.date ||

                    receipt.date ||

                    new Date().toISOString()

            });

            updatedAccounts=

                updatedAccounts.map(account=>{

                    if(account.id!==accountId)

                        return account;

                    return{

                        ...account,

                        balance:

                            transaction.type==="Income"

                                ? account.balance+

                                  Number(transaction.amount)

                                : account.balance-

                                  Number(transaction.amount)

                    };

                });

        });

        setTransactions([

            ...transactions,

            ...newTransactions

        ]);

        setAccounts(updatedAccounts);

        closeModal();

    }

    return(

        <>

            <div className="receipt-info">

                <div>

                    <span>{t("merchant")}</span>

                    <strong>
    {receipt.merchant || t("notDetected")}
</strong>

                </div>

                <div>

                    <span>{t("receiptDate")}</span>

                    <strong>
    {receipt.date || t("notDetected")}
</strong>

                </div>

                <div>

                    <span>{t("currency")}</span>

                    <strong>
    {receipt.currency || profile.currency}
</strong>

                </div>

                <div>

                    <span>{t("confidence")}</span>

                    <strong>
    {Math.round((receipt.confidence ?? 0) * 100)}%
</strong>

                </div>

            </div>

            <table className="receipt-table">

                <thead>

                    <tr>

                        <th>{t("date")}</th>

                        <th>{t("category")}</th>

                        <th>{t("type")}</th>

                        <th>{t("account")}</th>

                        <th>{t("amount")}</th>

                        {editing &&

                            <th></th>

                        }

                    </tr>

                </thead>

                <tbody>

                    {rows.map((row,index)=>(

                        <tr key={index}>

                            <td>

                                {editing ?

                                <input

                                    value={row.date}

                                    onChange={e=>

                                        updateRow(

                                            index,

                                            "date",

                                            e.target.value

                                        )

                                    }

                                />

                                :

                                row.date

                                }

                            </td>

                            <td>

                                {editing ?

                                <input

                                    value={row.category}

                                    onChange={e=>

                                        updateRow(

                                            index,

                                            "category",

                                            e.target.value

                                        )

                                    }

                                />

                                :

                                t(

                                    row.category.toLowerCase(),

                                    row.category

                                )

                                }

                            </td>

                            <td>

                                {editing ?

                                <select

                                    value={row.type}

                                    onChange={e=>

                                        updateRow(

                                            index,

                                            "type",

                                            e.target.value

                                        )

                                    }

                                >

                                    <option value="Income">
    {t("income")}
</option>

<option value="Expense">
    {t("expense")}
</option>

                                </select>

                                :

                                row.type

                                }

                            </td>

                            <td>

                                {editing ?

                                <select

                                    value={

                                        row.accountId ||

                                        accounts[0].id

                                    }

                                    onChange={e=>

                                        updateRow(

                                            index,

                                            "accountId",

                                            Number(e.target.value)

                                        )

                                    }

                                >

                                    {accounts.map(account=>(

                                        <option

                                            key={account.id}

                                            value={account.id}

                                        >

                                            {account.name}

                                        </option>

                                    ))}

                                </select>

                                :

                                accounts.find(

                                    a=>

                                    a.id===

                                    (row.accountId||

                                    accounts[0].id)

                                )?.name

                                }

                            </td>

                            <td>

                                {editing ?

                                <input

                                    type="number"

                                    value={row.amount}

                                    onChange={e=>

                                        updateRow(

                                            index,

                                            "amount",

                                            e.target.value

                                        )

                                    }

                                />

                                :

                                formatCurrency(

                                    row.amount,

                                    profile.currency,

                                    i18n.language

                                )

                                }

                            </td>

                            {editing &&

                                <td>

                                    <button

                                        className="receipt-delete"

                                        onClick={()=>

                                            deleteRow(index)

                                        }

                                    >

                                        <Trash2

                                            size={16}

                                        />

                                    </button>

                                </td>

                            }

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="receipt-actions">

                <button

                    className="receipt-cancel"

                    onClick={closeModal}

                >

                    {t("cancel")}

                </button>

                <button

                    className="receipt-edit"

                    onClick={()=>

                        setEditing(!editing)

                    }

                >

                    <Pencil size={17}/>

                    {editing ?

                        t("done")

                        :

                        t("edit")

                    }

                </button>

                <button

                    className="receipt-accept"

                    onClick={acceptTransactions}

                >

                    <Check size={18}/>

                    {t("acceptAll")}

                </button>

            </div>

        </>

    );

}
