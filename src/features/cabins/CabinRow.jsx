import React from "react";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateEditCabin from "./useCreateUpdateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    description,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const [createCabin, isCreating] = useCreateEditCabin(false);
  const [deleteCabin, isDeleting] = useDeleteCabin();

  function handleDuplicate() {
    createCabin({
      name: `Duplicate of ${name}`,
      description,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <Menus.Menu>
        <Menus.Toggle id={cabinId} />
        <Menus.List id={cabinId}>
          <Menus.Button
            icon={<HiSquare2Stack />}
            disabled={isCreating}
            onClick={handleDuplicate}
          >
            Duplicate
          </Menus.Button>

          <Modal.Open opens={`edit-cabin-${cabinId}`}>
            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
          </Modal.Open>
          <Modal.Open opens={`delete-cabin-${cabinId}`}>
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Modal.Open>
        </Menus.List>
        <Modal.Window name={`edit-cabin-${cabinId}`}>
          <CreateCabinForm cabin={cabin} />
        </Modal.Window>

        <Modal.Window name={`delete-cabin-${cabinId}`}>
          <ConfirmDelete
            resourceName="cabin"
            disabled={isDeleting}
            onConfirm={() => {
              deleteCabin(cabinId);
            }}
          />
        </Modal.Window>
      </Menus.Menu>
    </Table.Row>
  );
}

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default CabinRow;
