import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
} from '@material-ui/core';
import axios from 'axios';

const fieldsOffers = [
  {label: 'Offer ID', value: 'quick_offer_id'},
  {label: 'Name', value: 'sellerFirstname'},
  {label: 'Company', value: 'sellerName'},
  {label: 'Phone', value: 'sellerPhone'},
  {label: 'Category', value: 'productCategory'},
  {label: 'Offer Description', value: 'description'},
  {label: 'Price', value: 'price'},
  {label: 'Start', value: 'createdDate'},
  {label: 'Expires', value: 'expireDate'},
  {label: 'Orders', value: 'totalOrders'},
  {label: 'Buyers', value: 'totalBuyers'},
  {label: 'Buyers Seen', value: 'seenBuyers'},
  {label: 'Buyers Not Seen', value: 'notSeenBuyers'},
];


function Offers(props) {

  const [offers, setOffers] = useState([]);
  const [numberDays, setNumberDays] = useState(10);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_API_ENDPOINT}/api/v1/report/offers/allAppOffers?days=10`;
    axios.get(url, {headers: { 'x-access-token': token}}).then((res) => {
      setOffers(res.data);
    });    
  }, []);

  const handleNumberDays = (e) => {
    const days = e.target.value;
    setNumberDays(days);
    const url = `${process.env.REACT_APP_BASE_API_ENDPOINT}/api/v1/report/offers/allAppOffers?days=${days}`;
    axios.get(url, {headers: { 'x-access-token': token}}).then((res) => {
      console.log(res.data.length);
      setOffers(res.data);
    });
  };

  return (
    <>
      <div>
        <span>
          Number of Days:
        </span>
        <Select
          id="select-number-days"
          value={numberDays}
          onChange={handleNumberDays}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>        
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            {
              fieldsOffers.map((fieldOffers) => (
                <TableCell>
                  {
                    fieldOffers.label
                  }
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            offers.map((offer) => (
              <TableRow>
                {
                  fieldsOffers.map((fieldOffers) => (
                    <TableCell>
                      {
                        offer[fieldOffers.value]
                      }
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </>
  );
}


export default Offers;
