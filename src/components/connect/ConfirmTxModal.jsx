// import ConfirmSlider from "../../ConfirmSlider"
import { useEffect, useState } from "react"
import Card from "../ui/Card"
import Button from "../ui/Button"
import CloseIcon from '../../assets/close.svg'
import { useQubicConnect } from "./QubicConnectContext"

const ConfirmTxModal = ({ tx, open, onClose, onConfirm, beTickOffset = 3 }) => {
    const { getTick } = useQubicConnect()
    const [confirmedTx, setConfirmedTx] = useState(null)
    const [initialTick, setInitialTick] = useState(null)
    const [tick, setTick] = useState(null)

    const refetchInterval = 3000

    let intervalId;

    useEffect(() => {
        const fetchTick = async () => {
          const t = await getTick();
          setTick(t);
        };

        if (confirmedTx) {
          fetchTick(); // Fetch immediately when confirmedTx is set
          intervalId = setInterval(fetchTick, refetchInterval);
        }

        return () => clearInterval(intervalId); // Cleanup interval on unmount or when confirmedTx changes
    }, [confirmedTx, getTick]);

    useEffect(() => {
        if (tick !== null && confirmedTx !== null && initialTick !== null) {
            const targetTick = confirmedTx.targetTick;
            const normalizedTick = ((tick - initialTick) / (targetTick - initialTick)) * 100;
            const widthPercentage = Math.min(Math.max(normalizedTick, 0), 100);

            if (widthPercentage >= 100) {
              onClose()
            }
        }
    }, [tick, confirmedTx, initialTick, onClose])

    const startTickFetchInterval = async (cTx) => {
        cTx.targetTick = cTx.targetTick + beTickOffset // add ticks as quottery backend buffer
        // Fetch initial tick value
        const initialTickValue = await getTick()
        setInitialTick(initialTickValue)
        setConfirmedTx(cTx)
    }

    return (<>
        {open && <div
            className="w-full p-5 h-full fixed top-0 left-0 overflow-x-hidden overflow-y-auto z-50 bg-smoke-light flex"
            onClick={() => onClose()}
        >
            <Card className="relative p-8 w-full max-w-md m-auto flex-col flex" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center">
                    <div className="text-2xl text-white">qubic <span className="text-primary-40">connect</span></div>
                    <img src={CloseIcon} onClick={onClose} alt="Close Modal Icon" className="w-5 h-5 cursor-pointer" />
                </div>
                <div className="flex flex-col gap-4 mt-4">

                    {confirmedTx && <>
                            <p className="text-white">Current Tick: {tick} / {confirmedTx.targetTick}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-blue-600 h-2.5 rounded-full"
                                    style={{
                                        width: tick
                                          ? `${Math.min(
                                              Math.max(
                                                ((tick - initialTick) / (confirmedTx.targetTick - initialTick)) * 100,
                                                0
                                              ),
                                              100
                                            )}%`
                                          : "0%",
                                      }}>
                                </div>
                            </div>
                        </>
                    }

                    {!confirmedTx && <>
                      <p className="text-white">{tx.description}</p>
                      {/* <ConfirmSlider onConfirm={onConfirm} /> */}
                      <Button
                        label="Confirm"
                        primary={true}
                        onClick={async () => {
                          const confirmResult = await onConfirm()
                          // check if confirmed has finished with status 200
                          if (confirmResult.txResult && confirmResult.txResult.status !== 200) return
                          // start fetching tick and show progress bar
                          startTickFetchInterval(confirmResult)
                        }}
                      />
                    </>}
                    <Button label="Close" onClick={() => onClose()} />
                </div>
            </Card>
        </div>}
    </>)
}

export default ConfirmTxModal
