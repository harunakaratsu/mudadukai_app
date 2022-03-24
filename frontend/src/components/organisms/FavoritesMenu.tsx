import { Dispatch, memo, SetStateAction, useCallback, VFC } from 'react'
import axios from 'axios'
import { Flex, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons'

import { Food } from '../../type/Food'
import { useFavoriteFoods } from '../../hooks/useFavoriteFoods'
import { useMessage } from '../../hooks/useMessage'

type Props = {
  createFood: Omit<Food, 'id'>,
  setCreateFood: Dispatch<SetStateAction<Omit<Food, 'id'>>>
}

export const FavoritesMenu: VFC<Props> = memo((props) => {
  const { createFood, setCreateFood } = props
  const { favoriteFoods, setFavoriteFoods } = useFavoriteFoods()
  const { showMessage } = useMessage()

  // お気に入りをクリックしたら値をセットする
  const onClickFavorite = useCallback((favoriteFood) => {
    setCreateFood({
      ...createFood,
      name: favoriteFood.name,
      price: favoriteFood.price,
      calorie: favoriteFood.calorie
    })
  }, [createFood, setCreateFood])

  // お気に入りから削除する
  const onClickDeleteFavorite = (favoriteFood: Food) => {
    axios
      .put(`/foods/${favoriteFood.id}`, {
        favorite: false
      })
      .then((res) => {
        const newFavoriteFoods = [...favoriteFoods]
        newFavoriteFoods.splice(favoriteFoods.findIndex(f => f.id === favoriteFood.id), 1)
        setFavoriteFoods(newFavoriteFoods)
        showMessage({ status: 'success', title: `${favoriteFood.name}をお気に入りから削除しました` })
      })
      .catch(e => {
        console.error(e)
        showMessage({ status: 'error', title: 'お気に入りの削除に失敗しました' })
      })
  }

  const menuItem = () => {
    if (favoriteFoods.length) {
      return (
        favoriteFoods.map(favoriteFood => (
          <Flex key={ favoriteFood.id }>
            <MenuItem
              w='80%'
              ml={1}
              className='favorite'
              onClick={ () => onClickFavorite(favoriteFood) }
            >
              { favoriteFood.name }
            </MenuItem>
            <MenuItem  w='15%' className='favorite'>
              <SmallCloseIcon color='gray' onClick={ () => onClickDeleteFavorite(favoriteFood)} />
            </MenuItem>
          </Flex>
        ))
      )
    } else {
      return (
        <MenuItem ml={1} className='favorite'>登録されていません</MenuItem>
      )
    }
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton className='favorite'>
        <HamburgerIcon />
      </MenuButton>
      <MenuList maxW='200px'>
        <MenuGroup title='お気に入りから記録する'>
          { menuItem() }
        </MenuGroup>
      </MenuList>
    </Menu>
  )
})
