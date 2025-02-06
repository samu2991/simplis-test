<?php

namespace App\Controller;

use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class CustomerController extends AbstractController
{
    #[Route('/customers', name: 'create_customer', methods: ['POST', 'OPTIONS'])]
    public function createCustomer(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Gérer la requête OPTIONS
        if ($request->getMethod() === 'OPTIONS') {
            return new JsonResponse();
        }

        try {
            $data = json_decode($request->getContent(), true);
        
            $customer = new Customer();
            $customer->setFirstName($data['firstName']);
            $customer->setLastName($data['lastName']);
            $customer->setPhoneNumber($data['phoneNumber']);
            $customer->setEmail($data['email']);
            $customer->setAddress($data['address']);
            
            // Définir les timestamps
            $now = new \DateTimeImmutable();
            $customer->setCreatedAt($now);
            $customer->setUpdatedAt($now);

            $entityManager->persist($customer);
            $entityManager->flush();

            return new JsonResponse([
                'status' => 'success',
                'message' => 'Client créé avec succès',
                'id' => $customer->getId()
            ], JsonResponse::HTTP_CREATED);

        } catch (\Exception $e) {
            error_log('Erreur: ' . $e->getMessage());
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Erreur lors de la création du client: ' . $e->getMessage()
            ], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
