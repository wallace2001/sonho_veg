// import { useDispatch } from 'react-redux';
// import { Toast } from '../components/Toast';
// import { change } from '../store/actions/notify.action';

interface PropsStorage{
    id?: string;
}

export const Storage = async({id}: PropsStorage) => {
    const cart = await JSON.parse(localStorage.getItem("cart_list"));
    const oldCart: Array<[]> = cart ? cart : [];
    // const dispatch = useDispatch();
    let array = oldCart;

    const newItem: any = {
        id
    }

    const find = array.find((item: any) => {
        return item.id === id
    });

    if(find){
        oldCart.push();
        // dispatch(change({
        //     open: true,
        //     title: "Produto já adicionado ao carrinho.",
        //     status: "error",
        //     duration: 2 * 1000
        // }));
    }else{
        oldCart.push(newItem);
        // dispatch(change({
        //     open: true,
        //     title: "Produto adicionado ao carrinho.",
        //     status: "success",
        //     duration: 2 * 1000
        // }));
    }
    await localStorage.setItem("cart_list", JSON.stringify(oldCart));
}