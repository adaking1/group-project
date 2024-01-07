import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveOrderIds, getSavedOrders } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_ORDER } from '../utils/mutations';
import { GET_FOOD } from '../utils/queries';

const SearchFood = () => {
    const [searchedFood, setSearchedFood] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedOrderIds, setSavedOrderIds] = useState(getSavedOrders());
    const [saveOrder, { error }] = useMutation(SAVE_ORDER);
    const [getFood, { error, data }] = useQuery(GET_FOOD);

    useEffect(() => {
        return () => saveOrder(savedOrderIds);
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!searchInput) {
            return false;
        }
        try {
            const { data } = await getFood({
                variables: { input: searchInput }
            });
            const restaurantData = data.map((menu) => ({
                // put restaurant info here 
                menuId: menu.id,
                name: menu.name,
                description: menu.description,
                image: menu.image,
                location: menu.location                
            }));
            setSearchedFood(restaurantData);
            setSearchInput('');
            
        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <div className='text-light bg-dark p-5'>
            <Container>
                <h2>Search for food!</h2>
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='Search for food'
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <Button type='submit' variant='success' size='lg'>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
        <Container>
            <h3 className='pt-5'>
                {searchedFood.length ? `${searchedFood.length} restaurants` : 'Search for food'}
            </h3>
            <Row>
                {searchedFood.map((restaurant) => {
                    return (
                        <Col md='4' key={restaurant.menuId}>
                            <Card border='dark'>
                                {restaurant.image ? (
                                    <Card.Img src={restaurant.image} alt={`Image for ${restaurant.name}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{restaurant.name}</Card.Title>
                                    <Card.Text>{restaurant.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
        </>
    )
};

export default SearchFood;