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
        if ($request->getMethod() === 'OPTIONS') {
            return new JsonResponse([], JsonResponse::HTTP_OK);
        }

        try {
            $data = json_decode($request->getContent(), true);
            
            // Log des données reçues
            error_log('Données reçues: ' . print_r($data, true));

            $customer = new Customer();
            $customer->setFirstName($data['firstName']);
            $customer->setLastName($data['lastName']);
            $customer->setPhoneNumber($data['phoneNumber']);
            $customer->setEmail($data['email']);
            
            // Définir les timestamps
            $now = new \DateTimeImmutable();
            $customer->setCreatedAt($now);
            $customer->setUpdatedAt($now);

            $entityManager->persist($customer);
            $entityManager->flush();

            $response = new JsonResponse([
                'status' => 'success',
                'message' => 'Client créé avec succès',
                'id' => $customer->getId()
            ], JsonResponse::HTTP_CREATED);

        } catch (\Exception $e) {
            error_log('Erreur: ' . $e->getMessage());
            $response = new JsonResponse([
                'status' => 'error',
                'message' => $e->getMessage()
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Ajout des headers CORS
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:4200');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type');
        
        return $response;
    }
}
