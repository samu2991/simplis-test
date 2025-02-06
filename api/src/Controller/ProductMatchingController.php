<?php

namespace App\Controller;

use App\Repository\ProductRepository;
use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class ProductMatchingController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ProductRepository $productRepository
    ) {}

    #[Route('/api/match-products', name: 'app_match_products', methods: ['POST'])]
    public function matchProducts(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validation des données reçues
        if (!isset($data['eligibleLegalForm']) || 
            !isset($data['businessLocation']) || 
            !isset($data['activity']) || 
            !isset($data['maxProjectedTurnover'])) {
            return new JsonResponse(['error' => 'Données manquantes'], 400);
        }

        $qb = $this->entityManager->createQueryBuilder();
        $qb->select('p')
           ->from(Product::class, 'p')
           ->where('p.maxProjectedTurnover >= :turnover')
           ->andWhere('p.businessLocation = :location')
           ->andWhere('p.eligibleLegalForm = :legalForm')
           ->setParameter('turnover', $data['maxProjectedTurnover'])
           ->setParameter('location', $data['businessLocation'])
           ->setParameter('legalForm', $data['eligibleLegalForm']);

        $products = $qb->getQuery()->getResult();

        // Transformation des produits pour la réponse JSON
        $response = array_map(function($product) {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'insurer' => $product->getInsurer(),
                'businessLocation' => $product->getBusinessLocation(),
                'maxProjectedTurnover' => $product->getMaxProjectedTurnover()
            ];
        }, $products);

        return new JsonResponse($response);
    }
}
