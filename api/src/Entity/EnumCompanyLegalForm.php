<?php

declare(strict_types=1);

namespace App\Entity;

enum EnumCompanyLegalForm: string
{
    case ASSOCIATION = 'association';

    case AUTO_ENTREPRENEUR = 'auto-entrepreneur';

    case EI = 'ei';

    case EIRL = 'eirl';

    case EURL = 'eurl';

    case SA = 'sa';

    case SAS = 'sas';

    case SASU = 'sasu';

    case SELAFA = 'selafa';

    case SARL = 'sarl';

    case SELARL = 'selarl';

    case SOLE_TRADER = 'sole-trader';
}
