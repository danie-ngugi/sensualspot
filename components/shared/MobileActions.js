
import { WhatsAppIcon } from 'components/icons/whatsapp'
import { CallIcon } from 'components/icons/CallIcon'

import { business } from 'common/data'

export const MobileActions = () => {
    const color= {}
    return (
        <div className="fixed right-10 bottom-8 z-50">
            <a href={`tel://${business.phone}`} target="_blank" className="flex text-white justify-center items-center rounded-full mb-4 w-11 h-11 bg-blue-500">
                <CallIcon style={color} />
            </a>
            <a href={`https://wa.me/${business.whatsAppPhone}`} target="_blank" className="flex text-white justify-center items-center rounded-full w-11 h-11 bg-green-500">
                <WhatsAppIcon style={color} />
            </a>
        </div>
    );
}

export default MobileActions;